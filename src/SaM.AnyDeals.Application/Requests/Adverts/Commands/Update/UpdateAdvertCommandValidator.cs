using FluentValidation;
using SaM.AnyDeals.Common.Constraints;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;

public class UpdateAdvertCommandValidator : AbstractValidator<UpdateAdvertCommand>
{
    public UpdateAdvertCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(AdvertConstraints.TitleMaxLength);

        RuleFor(x => x.Description)
            .MaximumLength(AdvertConstraints.DescriptionMaxLength);
    }
}