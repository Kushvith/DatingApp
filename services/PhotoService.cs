using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Dating.Helpers;
using Dating.Interfsces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating.services
{
    public class PhotoService : IPhoto
    {
        private readonly Cloudinary cloudinary;
        // here the ioptions to get the conig data from the helpers method
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var Acc = new Account(
                    config.Value.cloudName,
                    config.Value.AppName,
                    config.Value.AppSecreat
                );
            cloudinary = new Cloudinary(Acc);
        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile formFile)
        {
            var uploadResults = new ImageUploadResult();
            if(formFile.Length > 0)
            {
                using var stream = formFile.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(formFile.FileName, stream),
                    Transformation  = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                };
                uploadResults = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResults;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string PublicId)
        {
            var deletionParams = new DeletionParams(PublicId);
            var Result = await cloudinary.DestroyAsync(deletionParams);
            return Result;
        }
    }
}
