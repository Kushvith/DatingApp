using Dating.expections;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace Dating.MiddleWare
{
    public class MiddlewareExpection
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<MiddlewareExpection> _logger;
        private readonly IHostEnvironment _env;

        public MiddlewareExpection(RequestDelegate next, ILogger<MiddlewareExpection> logger,IHostEnvironment environment)
        {
            _next = next;
            _logger = logger;
            _env = environment;
        }
        public async Task InvokeAsync(HttpContext http)
        {
            try{
                await _next(http);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                http.Response.ContentType = "Application/json";
                http.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                var res = _env.IsDevelopment() ? new Expection(http.Response.StatusCode, ex.Message, ex.StackTrace)
                    : new Expection(http.Response.StatusCode, ex.Message);
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(res, options);
                await http.Response.WriteAsync(json);
            }
        }
        

        
    
    }
}
