using FluentValidation;
using SaM.AnyDeals.Common.Constraints;

namespace SaM.AnyDeals.Application.Requests.Chat.Commands.Send;

public class SendMessageCommandValidator : AbstractValidator<SendMessageCommand>
{
    public SendMessageCommandValidator()
    {
        RuleFor(x => x.Text)
            .NotEmpty()
            .MaximumLength(MessageConstraints.TextMaxLength);
    }
}