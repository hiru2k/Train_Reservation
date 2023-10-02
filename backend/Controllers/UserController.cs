using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
        private readonly JwtSettings _jwtSettings;

        public UserController(IUserService userService, IOptions<JwtSettings> jwtSettings)
        {
            _userService = userService;
            _jwtSettings = jwtSettings.Value;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { success = false, message = "Invalid user data." });
            }

            var (isValid, role, email) = await _userService.AuthenticateAsync(user.Username, user.Password);
            if (isValid)
            {
                var token = GenerateJwtToken(user.Username, role, email);
                return Ok(new { success = true, message = "Login successful!", token, role });
            }

            return Unauthorized(new { success = false, message = "Invalid username or password." });
        }

        private string GenerateJwtToken(string username, string role, string email)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role),
                new Claim(ClaimTypes.Email, email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register([FromBody] UserModel newUser)
        {
            if (newUser == null || string.IsNullOrEmpty(newUser.Username) || string.IsNullOrEmpty(newUser.Password))
            {
                return BadRequest(new { success = false, message = "Invalid user data." });
            }

            var isUserUniq = await _userService.GetUserByEmailOrNICAsync(newUser.Email, newUser.NIC);
            if (isUserUniq)
            {
                var isUserAdded = await _userService.AddUserAsync(newUser);
                if (isUserAdded)
                {
                    return Ok(new { status = 200, message = "User registered successfully." });

                }
            }
            if (!isUserUniq)
            {
                return Ok(new { status = 401, isSuccess = false, message = "User already exists", });
            }
            return Ok(new { status = 405, isSuccess = false, message = "Admin access denied", });

        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }





        [HttpGet("profile")]
        public async Task<IActionResult> GetLoggedInUserProfile()
        {
            try
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(userEmail))
                {
                    return StatusCode(401, new { message = "Unauthorized" });
                }

                var user = await _userService.GetUserByEmailAsync(userEmail);
                if (user == null)
                {
                    return StatusCode(404, new { message = "User not found" });
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }


    }
}
