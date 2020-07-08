using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using ServerApp.Models.BindingTargets;

namespace ServerApp.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductValuesController : Controller
    {
        private readonly DataContext _dataContext;

        public ProductValuesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetProducts(string category, string search, bool related = false, bool metadata = false)
        {
            IQueryable<Product> query = _dataContext.Products;
            if (!string.IsNullOrWhiteSpace(category))
            {
                string catLower = category.ToLower();
                query = query.Where(p => p.Category.ToLower().Contains(catLower));
            }
            if (!string.IsNullOrWhiteSpace(search))
            {
                string searchLower = search.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(searchLower) || p.Description.ToLower().Contains(searchLower));
            }
            if (related)
            {
                query = query.Include(p => p.Supplier).Include(p => p.Ratings);
                List<Product> data = query.ToList();
                data.ForEach(p =>
                {
                    if (p.Supplier != null)
                    {
                        p.Supplier.Products = null;
                    }
                    if (p.Ratings != null)
                    {
                        p.Ratings.ForEach(r => r.Product = null);
                    }
                });
                return metadata ? CreateMetadata(data) : Ok(data);
            }else
            {
                return metadata ? CreateMetadata(query) : Ok(query);
            }
        }

        private IActionResult CreateMetadata(IEnumerable<Product> products)
        {
            var dataProduct = new
            {
                data = products,
                categories = _dataContext.Products.Select(p => p.Category).Distinct().OrderBy(c => c)
            };
            return Ok(dataProduct);
        }

        [HttpGet("{id}")]
        public Product GetProduct(long id)
        {
            var product = _dataContext.Products.FirstOrDefault(p => p.ProductId == id);
            var prod = _dataContext.Products
                .Include(p => p.Supplier).ThenInclude(p => p.Products)
                .Include(p => p.Ratings)
                .FirstOrDefault(p => p.ProductId == id);

            if(prod != null)
            {
                if(prod.Supplier != null)
                {
                    prod.Supplier.Products = prod.Supplier.Products.Select(p =>
                    new Product
                    {
                        ProductId = p.ProductId,
                        Name = p.Name,
                        Category = p.Category,
                        Description = p.Description,
                        Price = p.Price
                    });
                }

                if(prod.Ratings != null)
                {
                    foreach(Rating r in prod.Ratings)
                    {
                        r.Product = null;
                    }
                }
            }

            return prod;
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductData pdata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product p = pdata.Product;
            if(p.Supplier != null && p.Supplier.SupplierId != 0)
            {
                _dataContext.Attach(p.Supplier);
            }

            _dataContext.Add(p);
            _dataContext.SaveChanges();

            return Ok(p.ProductId);
        }

        [HttpPut("{id}")]
        public IActionResult ReplaceProduct(long id, [FromBody]ProductData productData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product p = productData.Product;
            p.ProductId = id;
            if(p.Supplier != null && p.Supplier.SupplierId != 0)
            {
                _dataContext.Attach(p.Supplier);
            }

            _dataContext.Update(p);
            _dataContext.SaveChanges();

            return Ok();
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateProduct(long id, [FromBody]JsonPatchDocument<ProductData> patch)
        {
            Product product = _dataContext.Products.Include(p => p.Supplier).First(p => p.ProductId == id);

            ProductData pdata = new ProductData { Product = product };

            patch.ApplyTo(pdata, ModelState);

            if (!ModelState.IsValid && !TryValidateModel(pdata))
            {
                return BadRequest(ModelState);
            }

            if(product.Supplier != null && product.Supplier.SupplierId != 0)
            {
                _dataContext.Attach(product.Supplier);
            }
            _dataContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public void DeleteProduct(long id)
        {
            _dataContext.Products.Remove(new Product { ProductId = id });
            _dataContext.SaveChanges();
        }
    }
}