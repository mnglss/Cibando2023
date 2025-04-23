using System.ComponentModel.DataAnnotations;
using CibandoServer.Controller.Dtos;
using CibandoServer.Core.Interfaces;
using CibandoServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace CibandoServer.Controller
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

    [HttpPost("Login")]
    [ProducesResponseType(type: typeof(UserDto), statusCode: 200)]
    [ProducesResponseType(typeof(bool), 200)]
    public async Task<ActionResult> Login([FromBody, Required] UserLoginRequest userLogin)
    {
      var user = await _userService.GetUserAsync(userLogin.User.Email, userLogin.User.Password);
      if (user == null)
        return NotFound(new { Resul = "User not found." });
      var userDto = new UserDto { Name = user.Name, Email = user.Email, Password = user.Password, Role = user.Role, Accepted = user.Accepted };
      return Ok(userDto);
    }

    [HttpPost("Signup")]
    [ProducesResponseType(type: typeof(string), statusCode: 200)]
    public async Task<ActionResult> CreateUser([FromBody, Required] UserDto newUser)
    {
      if (string.IsNullOrWhiteSpace(newUser.Password))
        return BadRequest(new { Result = "Password is required." });
      // Validate the user object here if needed
      var user = new User {
        Name=newUser.Name,
        Email = newUser.Email,
        Password = newUser.Password,
        Accepted = newUser.Accepted
      };
      if  (await _userService.CreateUserAsync(user))
        return Ok(new { Result = "User Created Successfully." });
      else
        return BadRequest(new { Result = "User Not Created." });
    }

    [HttpPost("Profile")]
    [ProducesResponseType(type: typeof(UserDto), statusCode: 200)]
    public async Task<ActionResult> GetUserProfile([FromBody, Required] UserProfileRequest userProfile)
    {
      var user = await _userService.GetUserProfileAsync(userProfile.User.Email);
      if (user == null)
        return NotFound(new { Result = "User not found." });
      var userDto = new UserDto {
        Name = user.Name,
        Email = user.Email,
        Role = user.Role,
        Accepted = user.Accepted,
        CreatedAt = user.CreatedAt.ToString(),
        UpdatedAt = user.UpdatedAt.ToString(),
        DeletedAt = user.DeletedAt.ToString(),
        LastLogin = user.LastLogin.ToString()
      };
      return Ok(userDto);
    }
  }
}
