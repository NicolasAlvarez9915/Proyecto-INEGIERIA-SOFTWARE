using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DistribuidoraESB.Config;
using Entity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using DistribuidoraESB.Models;

namespace DistribuidoraESB.Service
{
    public class JwtService
    {
        private readonly AppSetting _appSettings;

        public JwtService(IOptions<AppSetting> appSetting)
        {
            _appSettings = appSetting.Value;
        }

        public LoginViewModel GenerateToken(Usuario user)
        {
            // return null if user not found
            if (user == null)
                return null;

            var userResponse = new LoginViewModel() { Correo = user.Correo, IdPersona = user.IdPersona, Rol = user.Rol };

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Contraseña),
                    new Claim(ClaimTypes.Email, user.Correo),
                    new Claim(ClaimTypes.NameIdentifier, user.IdPersona),
                    new Claim(ClaimTypes.Role, user.Rol),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userResponse.Token = tokenHandler.WriteToken(token);

            return userResponse;
        }
    }
}
