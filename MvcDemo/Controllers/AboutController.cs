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
    public class AboutController : Controller
    {
		#region Members

		private MyAppSettings _settings;
		private ILogger<AboutController> _logger;

		#endregion

		#region Constructors

		public AboutController(IOptions<MyAppSettings> settings, ILogger<AboutController> logger)
		{
			_settings = settings.Value;
			_logger = logger;
		}

		#endregion

		#region Actions

		public IActionResult Index()
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
