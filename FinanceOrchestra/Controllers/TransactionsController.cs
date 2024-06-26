using FinanceOrchestra.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace FinanceOrchestra.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TransactionsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("FinanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("sp_GetAllTransactions", myCon))
                {
                    using (SqlDataReader myReader = myCommand.ExecuteReader())
                    {
                        // List to hold user data
                        List<ModelTransactions> transactions = new List<ModelTransactions>();

                        // Read data from SqlDataReader
                        while (myReader.Read())
                        {
                            transactions.Add(new ModelTransactions
                            {
                                TransactionId = myReader.GetInt32(0),
                                UserId = myReader.GetInt32(1),
                                TransactionType = myReader.GetString(2),
                                TransactionAmount = myReader.GetDecimal(3),
                                TransactionDate = myReader.GetDateTime(4),
                                IsActive = myReader.IsDBNull(5) ? null : myReader.GetBoolean(5),
                                UpdatedBy = myReader.IsDBNull(6) ? null : myReader.GetInt32(6),
                                UpdatedDate = myReader.IsDBNull(7) ? null : myReader.GetDateTime(7),
                            });
                        }
                        myCon.Close();
                        return Ok(transactions); // Return as Ok with user data list
                    }
                }
            }
        }


        [HttpPost]
        public IActionResult Post(ModelTransactions transaction)
        {
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("FinanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand("sp_CreateTransaction", myCon))
                {
                    myCommand.CommandType = CommandType.StoredProcedure;
                    myCommand.Parameters.AddWithValue("@UserId", transaction.UserId);
                    myCommand.Parameters.AddWithValue("@TransactionType", transaction.TransactionType);
                    myCommand.Parameters.AddWithValue("@TransactionAmount", transaction.TransactionAmount);

                    int rowsAffected = myCommand.ExecuteNonQuery();
                    myCon.Close();
                    if (rowsAffected > 0)
                    {
                        return Ok("Transaction created successfully"); // Success message
                    }
                    else
                    {
                        return StatusCode(500, "Error creating transaction"); // User not found message
                    }
                }
            }
        }

    }
}
