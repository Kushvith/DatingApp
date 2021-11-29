using Dating.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.Extensions
{
    public static class systemServiceExtension
    {
        public static IServiceCollection AddSystemservices(this IServiceCollection services,IConfiguration _config)
        {
            services.AddDbContext<Datacontext>(optios => {
                optios.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers();
            services.AddCors();
            return services;
        }
    }
}
