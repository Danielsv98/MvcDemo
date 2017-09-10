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
	}
}
