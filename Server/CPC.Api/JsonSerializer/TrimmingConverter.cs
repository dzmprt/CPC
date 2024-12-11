using System.Text.Json;
using System.Text.Json.Serialization;

namespace CPC.Api.JsonSerializer;

/// <summary>
///     Trim leading and trailing whitespace.
/// </summary>
public class TrimmingConverter : JsonConverter<string>
{
    /// <summary>
    ///     Trim the input string
    /// </summary>
    /// <param name="reader">reader</param>
    /// <param name="typeToConvert">Object type</param>
    /// <param name="options">Existing Value</param>
    /// <returns></returns>
    public override string? Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        return reader.GetString()?.Trim();
    }

    /// <summary>
    ///     Trim the output string
    /// </summary>
    /// <param name="writer">Writer</param>
    /// <param name="value">value</param>
    /// <param name="options">serializer</param>
    public override void Write(
        Utf8JsonWriter writer,
        string? value,
        JsonSerializerOptions options)
    {
        writer.WriteStringValue(value?.Trim());
    }
}