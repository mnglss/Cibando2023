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

    [HttpGet("Exists")]
    [ProducesResponseType(typeof(bool), 200)]
    public async Task<ActionResult> GetUser([FromQuery, Required] string email, [FromQuery, Required] string Password)
    {
      var user = await _userService.GetUserAsync(email, Password);
      if (user == null)
        return NotFound(new { Resul = "User not found." });
      return Ok(new { Result= "User Found." });
    }

    [HttpPost("Signup")]
    [ProducesResponseType(type: typeof(string), statusCode: 200)]
    public async Task<ActionResult> CreateUser([FromBody, Required] UserDto newUser)
    {
      // Validate the user object here if needed
      var user = new User{ Name=newUser.Name, Email = newUser.Email, Password = newUser.Password};
      if  (await _userService.CreateUserAsync(user))
        return Ok(new { Result = "User Created Successfully." });
      else
        return BadRequest(new { Result = "User Not Created." });
    }
  }
}
