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
			return View();
        }

		[HttpPost]
		public IActionResult Index(ContactViewModel viewModel) {
			return View();
		}
	}
}
