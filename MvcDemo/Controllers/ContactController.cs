using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MvcDemo.ViewModels;

namespace MvcDemo.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
			return View(new ContactViewModel { Success = false });
        }

		[HttpPost]
		public IActionResult Index(ContactViewModel viewModel) {

			if (this.ModelState.IsValid == false)
				return View(viewModel);

			// Send email

			// Clear form
			this.ModelState.Clear();
			return View(new ContactViewModel { Success = true });
		}
	}
}
