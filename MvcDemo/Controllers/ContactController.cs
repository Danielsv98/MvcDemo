using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MvcDemo.ViewModels;
using System.Net;
using MvcDemo.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Logging;

namespace MvcDemo.Controllers
{
    public class ContactController : Controller
    {
		#region Members

		private MyAppSettings _settings;
		private ILogger<ContactController> _logger;

		#endregion

		#region Constructors

		public ContactController(IOptions<MyAppSettings> settings, ILogger<ContactController> logger)
		{
			_settings = settings.Value;
			_logger = logger;
		}

		#endregion

		public IActionResult Index()
        {
			return View(new ContactViewModel { Success = false });
        }

		[HttpPost]
		public IActionResult Index(ContactViewModel viewModel) {
			try
			{
				if (this.ModelState.IsValid == false)
					return View(viewModel);

				// Validate Google reCaptcha
				var captchaHeader = this.Request.Form["g-recaptcha-response"];
				var client = new WebClient();
				var result = client.DownloadString(string.Format(_settings.ReCaptchaUrl, _settings.ReCaptchaKey, captchaHeader));
				var response = JObject.Parse(result);
				var status = (bool)response.SelectToken("success");
				if (status == false)
					throw new Exception("ReCaptcha header is incorrect");

				// Send email
				var smtpClient = new System.Net.Mail.SmtpClient(_settings.SmtpServer, _settings.SmtpPort)
				{
					Credentials = new NetworkCredential(_settings.Email, _settings.EmailPassword),
					EnableSsl = false
				};

				var body = "Full Name : " + viewModel.FullName + Environment.NewLine +
						   "Company : " + viewModel.Company + Environment.NewLine +
						   "Phone : " + viewModel.Phone + Environment.NewLine +
						   "Email : " + viewModel.Email + Environment.NewLine +
						   "Message : " + viewModel.Message + Environment.NewLine;

				try
				{
					smtpClient.Send(_settings.Email, _settings.Email, "Contact Form", body);
				}
				catch (Exception ex)
				{
					_logger.LogError(ex.Message);
				}

				// Clear form
				this.ModelState.Clear();
				return View(new ContactViewModel { Success = true });

			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message);
				throw ex;
			}
		}
	}
}
