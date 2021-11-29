using AutoMapper;
using Dating.DTOs;
using Dating.Extensions;
using Dating.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDtos>()
                .ForMember(dest => dest.PhotoUrl,opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.Ismain).Url))
                .ForMember(dest => dest.Age,opt => opt.MapFrom(src => src.DateOfBirth.calculateAge()));
            CreateMap<photo, photoDto>();
        }
    }
}
