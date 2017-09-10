﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MvcDemo.ViewModels;
using System.Net;
using MvcDemo.Configuration;
using Microsoft.Extensions.Options;

namespace MvcDemo.Controllers
{
    public class ContactController : Controller
    {
		#region Members

		private MyAppSettings _settings;

		#endregion

		#region Constructors

		public ContactController(IOptions<MyAppSettings> settings)
		{
			_settings = settings.Value;
		}

		#endregion

		public IActionResult Index()
        {
			return View(new ContactViewModel { Success = false });
        }

		[HttpPost]
		public IActionResult Index(ContactViewModel viewModel) {

			if (this.ModelState.IsValid == false)
				return View(viewModel);

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

			smtpClient.Send(_settings.Email, _settings.Email, "Contact Form", body);

			// Clear form
			this.ModelState.Clear();
			return View(new ContactViewModel { Success = true });
		}
	}
}
