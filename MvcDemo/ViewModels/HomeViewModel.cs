using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MvcDemo.Configuration;

namespace MvcDemo.ViewModels
{
    public class HomeViewModel
    {
		public MyAppSettings Settings { get; set; }
	}
}
