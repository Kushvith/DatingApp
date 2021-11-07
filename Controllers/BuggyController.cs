using Dating.Data;
using Dating.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.Controllers
{

    public class BuggyController : BaseApiController
    {
        private readonly Datacontext _context;

        public BuggyController(Datacontext context )
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("Auth")]
        public ActionResult<string> GetAuth()
        {
            return "secreatKey";
        }
        [HttpGet("404-error")]
        public ActionResult<AppUser> Get404()
        {
            var user = _context.Users.Find(-1);
            if (user == null) return NotFound();
            return Ok(user);
        }
        [HttpGet("server-error")]
        public ActionResult<string> get505()
        {
            var user = _context.Users.Find(-1);
            var thing = user.ToString();
            return thing;
        }
        [HttpGet("bad-request")]
        public ActionResult<string> get401()
        {
            return BadRequest("this is bad request");
        }
    }
}
