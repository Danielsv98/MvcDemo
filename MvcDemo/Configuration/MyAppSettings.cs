using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MvcDemo.Configuration
{
    public class MyAppSettings
    {
		public string DemoApi { get; set; }
		public string StackOverflowApi { get; set; }
		public string GitHubApi { get; set; }
		public string Email { get; set; }
		public string EmailPassword { get; set; }
		public string SmtpServer { get; set; }
		public int SmtpPort { get; set; }
		public string ReCaptchaUrl { get; set; }
		public string ReCaptchaKey { get; set; }
	}
}
