using Microsoft.AspNetCore.Mvc;
using System;


namespace Angular_Playground.Controllers
{
    [ApiController]
    [Route(" [controller]")]
    
    public class SerialCommController : ControllerBase
    {
        [HttpGet("get-ports")]
        public IActionResult GetPorts()
        {
            SerialComm sc = new SerialComm();
            return Ok(sc.GetPortList());
        }

        [HttpGet("test-port/{portName}")]
        public IActionResult TestPort(string portName)
        {
            SerialComm sc = new SerialComm();
            bool result = sc.TestPort(portName);
            return Ok(new { success = result });
        }
        [HttpPost("open-port")]
        public IActionResult OpenComPort([FromBody] string portName)
        {
            SerialComm sc = new SerialComm();
            bool result = sc.OpenComPort(portName);
            return Ok(new { success = result });
        }

        [HttpPost("close-port")]
        public IActionResult ClosePort()
        {
            SerialComm sc = new SerialComm();
            sc.ClosePort();
            return Ok(new { success = true });
        }

        [HttpGet("simple-test")]
        public IActionResult SimpleTest()
        {
            // Debugging: Log that the method got hit
            Console.WriteLine("SimpleTest method was called");

            return Ok(new { message = "Simple test succeeded" });
        }
    }
}