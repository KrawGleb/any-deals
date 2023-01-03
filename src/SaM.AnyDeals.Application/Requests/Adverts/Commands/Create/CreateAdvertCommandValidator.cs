using FluentValidation;
using SaM.AnyDeals.Common.Constraints;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;

public class CreateAdvertCommandValidator : AbstractValidator<CreateAdvertCommand>
{
	public CreateAdvertCommandValidator()
	{
		RuleFor(x => x.Title)
			.NotEmpty()
			.MaximumLength(AdvertConstraints.TitleMaxLength);

		RuleFor(x => x.Description)
			.MaximumLength(AdvertConstraints.DescriptionMaxLength);
	}
}
