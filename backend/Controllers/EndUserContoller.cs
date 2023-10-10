/*
 * Filename: EndUserController.cs
 * Description: Contains endpoints of endUserSevice management such as account creation, logging, update accounts......
 * Author: Hiruni Mudannayake
 */

using backend.Data;
using backend.Models;
using backend.Services;
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
    public class EndUserController : ControllerBase
    {
        private readonly IEndUserService _userService;
        private readonly JwtSettings _jwtSettings;

        // Initializes the traveler controller with traveler service and JWT settings
        public EndUserController(IEndUserService userService, IOptions<JwtSettings> jwtSettings)
        {
            _userService = userService;
            _jwtSettings = jwtSettings.Value;
        }

        // Endpoint for traveler login

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EndUserModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { success = false, message = "Invalid user data." });
            }

            var (isValid, User) = await _userService.AuthenticateAsync(user);
            if (isValid)
            {
                if (User.Status == "Active")
                {
                    var token = GenerateJwtToken(User.NIC, User.Role, User.Email);
                    return Ok(new { status = 200, message = "Login successful!", token, User });//code 200
                }

                if (User.Status == "Pending")
                {

                    return StatusCode(403, new { success = false, message = "You have to wait till acivate your account" });
                }
                if (User.Status == "Deactivate")
                {

                    return StatusCode(200, new { success = true, message = "You have deactivated your account", User });
                }

            }

            return Unauthorized(new { success = false, message = "Invalid username or password." });//code 401
        }

        // Helper method to generate JWT token with nic(primary key, role and mail)
        private string GenerateJwtToken(string nic, string role, string email)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, nic),
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

        // Endpoint for traveller registration

        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] EndUserModel newUser)
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
                return StatusCode(401, new { isSuccess = false, message = "User already exists", });
            }
            return Ok(new { status = 405, isSuccess = false, message = "Admin access denied", });

        }


        // Endpoint to get all travellers who are created accounts
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }



        // Endpoint to get logged-in travel user's profile

        [HttpGet("profile")]
        public async Task<IActionResult> GetLoggedInUserProfile()
        {
            try
            {
                var userNic = User.FindFirst(ClaimTypes.Name)?.Value;
                if (string.IsNullOrEmpty(userNic))
                {
                    return StatusCode(401, new { message = "Unauthorized" });
                }

                var user = await _userService.GetUserByNICAsync(userNic);
                if (user == null)
                {
                    return StatusCode(404, new { message = "User not found" });
                }

                return Ok(user);
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // Endpoint to get a specific traveller  by NIC(primary key)
        [HttpGet("oneUser/{nic}")]
        public async Task<IActionResult> GetOneUserByNIC(string nic)
        {
            try
            {
                var AccesserRole = User.FindFirst(ClaimTypes.Role)?.Value;
                var user = await _userService.GetUserByNICAsync(nic);
                if (user == null)
                {
                    return StatusCode(404, new { message = "User not found" });
                }

                return Ok(new { status = 200, User = user, AccRole = AccesserRole });//return multiple values to the frontend
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // Endpoint to update traveller profile by NIC

        [HttpPut("profile/{nic}")]
        public async Task<IActionResult> UpdateUserProfile(string nic, [FromBody] EndUserModel updatedUser)
        {
            try
            {
                var isSuccess = await _userService.UpdateUserProfileAsync(nic, updatedUser);
                if (isSuccess)
                {
                    return Ok(new { status = 200, message = "Profile Updated successfully." });
                }
                else
                {
                    return Ok(new { status = 201, message = "Content not changed" });
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { success = false, message = "Internal server error", error = ex.Message });
            }
        }




    }
}
