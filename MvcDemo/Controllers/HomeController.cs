using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MvcDemo.Configuration;
using MvcDemo.ViewModels;
using Microsoft.Extensions.Logging;

namespace MvcDemo.Controllers
{
    public class HomeController : Controller
    {
		#region Members

		private MyAppSettings _settings;
		private ILogger<HomeController> _logger;

		#endregion

		#region Constructors

		public HomeController(IOptions<MyAppSettings> settings, ILogger<HomeController> logger) {
			_settings = settings.Value;
			_logger = logger;
		}

		#endregion

		#region Actions

		public IActionResult Index()
        {
			var viewModel = new HomeViewModel { Settings = _settings };

			try
			{
				return View(viewModel);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				throw ex;
			}
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
