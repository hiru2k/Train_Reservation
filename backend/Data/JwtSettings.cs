/*
 * Filename: JwtSettings.cs
 * Description:  Contains properties like Issuer,Audience,Key , which are used to generate token.
 * Author: Hiruni Mudannayake
 */
namespace backend.Data;

public class JwtSettings
{
    public string Issuer { get; set; } = null!;
    public string Audience { get; set; } = null!;
    public string Key { get; set; } = null!;
}
