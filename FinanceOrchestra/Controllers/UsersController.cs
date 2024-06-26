using FinanceOrchestra.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;

namespace FinanceOrchestra.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("FinanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("sp_GetAllUsers", myCon))
                {
                    using (SqlDataReader myReader = myCommand.ExecuteReader())
                    {
                        // List to hold user data
                        List<ModelUsers> users = new List<ModelUsers>();

                        // Read data from SqlDataReader
                        while (myReader.Read())
                        {
                            users.Add(new ModelUsers
                            {
                                UserId = myReader.GetInt32(0),
                                Name = myReader.IsDBNull(1) ? null : myReader.GetString(1),
                                Surname = myReader.IsDBNull(2) ? null : myReader.GetString(2),
                                Gender = myReader.IsDBNull(3) ? null : myReader.GetString(3)[0] ,
                                BirthDate = myReader.IsDBNull(4) ? null : myReader.GetDateTime(4) ,
                                TlBalance = myReader.IsDBNull(5) ? null : myReader.GetDecimal(5) ,
                                GoldBalance = myReader.IsDBNull(6) ? null : myReader.GetDecimal(6) ,
                                IBAN = myReader.IsDBNull(7) ? null : myReader.GetInt32(7) ,
                                IsActive =  myReader.GetBoolean(8) ,
                                UpdatedBy = myReader.IsDBNull(9) ? null : myReader.GetInt32(9) ,
                                UpdatedDate = myReader.IsDBNull(10) ? null : myReader.GetDateTime(10)
                            });
                        }
                        myCon.Close();
                        return Ok(users); // Return as Ok with user data list
                    }
                }
            }
        }


        [HttpPost]
        public IActionResult Post(ModelUsers user)
        {
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("FinanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("sp_CreateUser", myCon))
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@Name", user.Name);
                    myCommand.Parameters.AddWithValue("@Surname", user.Surname);
                    myCommand.Parameters.AddWithValue("@Gender", user.Gender);
                    myCommand.Parameters.AddWithValue("@BirthDate", user.BirthDate);
                    myCommand.Parameters.AddWithValue("@TlBalance", user.TlBalance);
                    myCommand.Parameters.AddWithValue("@GoldBalance", user.GoldBalance);
                    myCommand.Parameters.AddWithValue("@UpdatedBy", user.UpdatedBy);
                    myCommand.Parameters.AddWithValue("@UpdatedDate", user.UpdatedDate);

                    int rowsAffected = myCommand.ExecuteNonQuery();
                    myCon.Close();
                    if (rowsAffected > 0)
                    {
                        return Ok("User created successfully"); // Success message
                    }
                    else
                    {
                        return StatusCode(500, "Error creating user"); // User not found message
                    }
                }
            }
        }


        [HttpDelete]
        public IActionResult Delete(ModelUsers user)
        {
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("FinanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("sp_DeleteUser", myCon))
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@UserId", user.UserId);

                    int rowsAffected = myCommand.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok("User deleted successfully"); // Success message
                    }
                    else
                    {
                        return NotFound("User not found"); // User not found message
                    }
                }
                
            }
        }


        [HttpPut]
        public IActionResult Put(ModelUsers user)
        {
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("FinanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("sp_UpdateUser", myCon))
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@UserId", user.UserId);
                    myCommand.Parameters.AddWithValue("@NewName", user.Name);
                    myCommand.Parameters.AddWithValue("@NewSurname", user.Surname);
                    myCommand.Parameters.AddWithValue("@NewGender", user.Gender);
                    myCommand.Parameters.AddWithValue("@NewBirthDate", user.BirthDate);
                    myCommand.Parameters.AddWithValue("@NewTlBalance", user.TlBalance);
                    myCommand.Parameters.AddWithValue("@NewGoldBalance", user.GoldBalance);
                    myCommand.Parameters.AddWithValue("@NewIsActive", user.IsActive);
                    myCommand.Parameters.AddWithValue("@UpdatedBy", user.UpdatedBy);

                    int rowsAffected = myCommand.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok("User updated successfully"); // Success message
                    }
                    else
                    {
                        return NotFound("User not found"); // User not found message
                    }
                    
                }
            }
        }
    }
}
