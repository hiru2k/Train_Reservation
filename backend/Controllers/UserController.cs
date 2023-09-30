using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { success = false, message = "Invalid user data." });
            }

            var (isValid, role) = await _userService.AuthenticateAsync(user.Username, user.Password);
            if (isValid)
            {
                var token = GenerateJwtToken(user.Username, role);
                return Ok(new { success = true, message = "Login successful!", token, role });
            }

            return Unauthorized(new { success = false, message = "Invalid username or password." });
        }

        private string GenerateJwtToken(string username, string role)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("HeyThisIsOurSecretKeyForTrainManagementBetterNotToTellAnyone")); // Replace with your secret key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "YourIssuer", // Replace with your issuer
                audience: "YourAudience", // Replace with your audience
                claims: claims,
                expires: DateTime.Now.AddHours(1), // Token expiration time
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserModel newUser)
        {
            if (newUser == null || string.IsNullOrEmpty(newUser.Username) || string.IsNullOrEmpty(newUser.Password))
            {
                return BadRequest(new { success = false, message = "Invalid user data." });
            }

            // You might want to perform additional validation on the newUser object

            var isUserAdded = await _userService.AddUserAsync(newUser);
            if (isUserAdded)
            {
                return Ok(new { success = true, message = "User registered successfully." });
            }

            return StatusCode(500, new { success = false, message = "Failed to register user." });
        }





    }
}
