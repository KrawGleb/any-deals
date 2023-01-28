using AutoMapper;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Chat.Commands.Send;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Common.MappingProfiles;

public class MessageMappingProfile : Profile
{
    public MessageMappingProfile()
    {
        CreateMap<MessageDbEntry, MessageViewModel>();
        CreateMap<SendMessageCommand, MessageDbEntry>()
            .ForMember(d => d.ChatId, s => s.Ignore())
            .ForMember(d => d.CreatedAt, s => s.Ignore())
            .ForMember(d => d.SenderId, s => s.Ignore());
    }
}
