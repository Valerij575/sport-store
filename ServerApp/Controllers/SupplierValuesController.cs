using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Models;
using ServerApp.Models.BindingTargets;

namespace ServerApp.Controllers
{
    [Route("api/suppliers")]
    public class SupplierValuesController : Controller
    {
        private readonly DataContext _dataContext;

        public SupplierValuesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IEnumerable<Supplier> GetSuppliers()
        {
            return _dataContext.Suppliers;
        }

        [HttpPost]
        public IActionResult CreateSupplier([FromBody]SupplierData supplierData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Supplier s = supplierData.Supplier;
            _dataContext.Add(s);
            _dataContext.SaveChanges();

            return Ok(s.SupplierId);
        }

        [HttpPut("{id}")]
        public IActionResult ReplaceSupplier(long id, [FromBody]SupplierData supplierData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Supplier s = supplierData.Supplier;
            s.SupplierId = id;
            _dataContext.Update(s);
            _dataContext.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public void DeleteSupplier(long id)
        {
            _dataContext.Remove(new Supplier
            { SupplierId = id });

            _dataContext.SaveChanges();
        }
    }
}