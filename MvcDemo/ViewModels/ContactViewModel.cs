using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MvcDemo.ViewModels
{
    public class ContactViewModel
    {
		[Required(ErrorMessage = "Please enter your title")]
		public string Title { get; set; }

		[Required(ErrorMessage = "Please enter your name")]
		public string FullName { get; set; }

		public string Company { get; set; }

		[Required(ErrorMessage = "Please enter a contact email")]
		[RegularExpression(".+\\@.+\\..+", ErrorMessage = "Please enter a valid email address")]
		public string Email { get; set; }

		[Required(ErrorMessage = "Please enter a contact phone")]
		public string Phone { get; set; }

		[Required(ErrorMessage = "The message field can not be empty")]
		public string Message { get; set; }

		public bool Success { get; set; }
	}
}
