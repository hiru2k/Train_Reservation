//file : JwtSettings.cs

//IT Number:IT18161298

//Description:Jwt setting file
namespace backend.Data;

public class JwtSettings
{
    public string Issuer { get; set; } = null!;
    public string Audience { get; set; } = null!;
    public string Key { get; set; } = null!;
}
