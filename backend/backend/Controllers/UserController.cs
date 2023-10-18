/*
 * Filename: UserController.cs
 * Description: Contains endpoints of Back officer and travel agent  management services such as account creation, update accounts.
 * Author: Hiruni Mudannayake
 */
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

        // Initializes the (backofficer+traveler) controller with traveler (backofficer+traveler) and JWT settings
        public UserController(IUserService userService, IOptions<JwtSettings> jwtSettings)
        {
            _userService = userService;
            _jwtSettings = jwtSettings.Value;
        }

        // Endpoint for (backofficer+traveler) user login 

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { success = false, message = "Invalid user data." });
            }


            var (isValid, role, email, nic) = await _userService.AuthenticateAsync(user);
            if (isValid)
            {
                var token = GenerateJwtToken(nic, role, email);
                return Ok(new { success = true, message = "Login successful!", token, role });
            }

            return Unauthorized(new { success = false, message = "Invalid username or password." });
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

        // Endpoint for for (backofficer+traveler) account creation

        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register([FromBody] UserModel newUser)
        {
            if (newUser == null || string.IsNullOrEmpty(newUser.Username) || string.IsNullOrEmpty(newUser.Password))
            {
                return BadRequest(new { success = false, message = "Invalid user data." });
            }

            // Hash the user's password before storing it in the database
            newUser.Password = _userService.HashPassword(newUser.Password);


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



        // Endpoint to get logged-in (backofficer+traveler) user's profile details


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









        // Endpoint to update (backofficer+traveler) profile by NIC
        [HttpPut("profile/{nic}")]
        public async Task<IActionResult> UpdateUserProfile(string nic, [FromBody] UpdateUserRequest updateUserRequest)
        {
            try
            {
                if (updateUserRequest.NewPassword == "")
                {

                    var isSuccess = await _userService.UpdateUserProfileWithoutPasswordAsync(nic, updateUserRequest.UpdatedUser);
                    if (isSuccess)
                    {
                        return Ok(new { status = 200, message = "Profile Updated successfully." });
                    }
                    else
                    {
                        return Ok(new { status = 201, message = "Content not changed" });
                    }
                }
                else
                {

                    // Verify the current password before proceeding with the update
                    var isPasswordCorrect = await _userService.VerifyUserPasswordAsync(nic, updateUserRequest.CurrentPassword);
                    if (isPasswordCorrect)
                    {
                        updateUserRequest.UpdatedUser.Password = _userService.HashPassword(updateUserRequest.NewPassword);

                        var isSuccess = await _userService.UpdateUserProfileWithPasswordAsync(nic, updateUserRequest.UpdatedUser);

                        if (isSuccess)
                        {
                            return Ok(new { status = 200, message = "Profile Updated successfully with password" });
                        }
                        else
                        {
                            return Ok(new { status = 201, message = "Content not changed" });
                        }

                    }
                    return Ok(new { status = 203, message = "Current password is invalid" });

                }

            }
            catch (Exception ex)
            {

                return StatusCode(500, new { success = false, message = "Internal server error", error = ex.Message });
            }
        }



    }



    public class UpdateUserRequest
    {
        public string CurrentPassword { get; set; } // Current password for verification
        public string NewPassword { get; set; }     // New password for update
        public UserModel UpdatedUser { get; set; }  // Updated user details (username, email, etc.)
    }

}
