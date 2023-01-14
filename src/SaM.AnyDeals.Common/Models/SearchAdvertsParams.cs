using Nest;
using SaM.AnyDeals.Common.Constants;

namespace SaM.AnyDeals.Common.Models;

public class SearchAdvertsParams
{
    public string? Title { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Category { get; set; }
    public int? Goal { get; set; }
    public int? Group { get; set; }
    public int? Interest { get; set; }
    public int? From { get; set; } = 0;
    public int Size { get; set; } = 25;

    public SearchRequest SearchRequest
    {
        get => new(ElasticConstants.IndexName)
        {
            From = From,
            Size = Size,
            Query = new BoolQuery
            {
                Must = new List<QueryContainer>
                {
                    new QueryStringQuery { DefaultField = "title", Query = $"*{Title}*"  },
                    new MatchPhraseQuery { Field = "category", Query = Category?.ToLower() }
                },
                Filter = new List<QueryContainer>
                {
                    new TermQuery { Field = "country", Value = Country?.ToLower() },
                    new TermQuery { Field = "city", Value = City?.ToLower() },
                    new TermQuery { Field = "interest", Value = Interest?.ToString() },
                    new TermQuery { Field = "goal", Value = Goal?.ToString() },
                    new TermQuery { Field = "group", Value = Group?.ToString() }
                }
            }
        };
    }
}
