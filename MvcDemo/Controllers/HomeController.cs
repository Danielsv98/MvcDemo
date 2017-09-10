using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MvcDemo.Configuration;
using MvcDemo.ViewModels;

namespace MvcDemo.Controllers
{
    public class HomeController : Controller
    {
		#region Members

		private MyAppSettings _settings;

		#endregion

		#region Constructors

		public HomeController(IOptions<MyAppSettings> settings) {
			_settings = settings.Value;
		}

		#endregion

		#region Actions

		public IActionResult Index()
        {
			var viewModel = new HomeViewModel { Settings = _settings };

			return View(viewModel);
        }

		public IActionResult About()
		{
			return View();
		}

		public IActionResult Error()
        {
            return View();
        }

		#endregion
	}
}
