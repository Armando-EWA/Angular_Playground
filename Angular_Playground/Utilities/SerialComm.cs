using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using Serilog;

public class SerialComm
{
    private static readonly Serilog.ILogger logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

    // Static SerialPort
    public readonly SerialPort sp = new SerialPort();


    // Returns a list of available serial port names.
    public List<string> GetPortList()
    {
        var portList = new List<string>();
        try
        {
            portList.AddRange(SerialPort.GetPortNames());
        }
        catch (IOException e)
        {
            logger.Error("Unable to retrieve port list: {@Exception}", e);
        }
        return portList;
    }

    // Tests the availability of a specified serial port.
    public bool TestPort(string portName)
    {
        if (string.IsNullOrWhiteSpace(portName))
        {
            logger.Warning("Invalid port name specified for testing.");
            return false;
        }

        if (!SerialPort.GetPortNames().Contains(portName))
        {
            logger.Warning($"Port {portName} does not exist.");
            return false;
        }

        if (sp.IsOpen && sp.PortName == portName)
        {
            return true;  // Correct port is already open.
        }

        ClosePort();  // Close the port if it's open, regardless of its name.

        try
        {
            sp.PortName = portName;
            sp.Open();

            logger.Debug($"Successfully tested port: {portName}");
            return true;
        }
        catch (UnauthorizedAccessException)
        {
            logger.Warning($"Port {portName} is already in use by another application.");
            return false;
        }
        catch (Exception e) when (e is IOException || e is ArgumentException)
        {
            logger.Error("Exception while testing the port: {@Exception}", e);
            return false;
        }
        finally
        {
            ClosePort();
        }
    }

    public bool OpenComPort(string portName)
    {
        bool retval = true;
        logger.Debug("Attempting to open port ...");

        try
        {
            ClosePort();

            // Setup port
            sp.PortName = portName;  // Replace with configuration values in the future
            int portSpeed = 9600;      // Replace with configuration values in the future

            switch (portSpeed)
            {
                case 9600: sp.BaudRate = 9600; break;
                case 19200: sp.BaudRate = 19200; break;
                case 38400: sp.BaudRate = 38400; break;
                case 57600: sp.BaudRate = 57600; break;
                case 115200: sp.BaudRate = 115200; break;
            }

            sp.DataBits = 8;            // Replace with configuration values in the future
            sp.StopBits = StopBits.One; // Replace with configuration values in the future
            sp.Handshake = Handshake.None; // Replace with configuration values in the future
            sp.Parity = Parity.None;    // Replace with configuration values in the future

            sp.Open();

            logger.Debug($"{portName} opened successfully");
        }
        catch (Exception e)
        {
            logger.Error(e.Message, e);
            return false;
        }

        return retval;
    }

    // Closes the serial port if it's open.
    public void ClosePort()
    {
        try
        {
            if (sp.IsOpen)
            {
                sp.Close();
            }
        }
        catch (IOException e)
        {
            logger.Warning("Exception while closing the port: {@Exception}", e);
        }
    }
}