using FluentValidation;
using SaM.AnyDeals.Common.Constraints;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;

public class CreateAdvertCommandValidator : AbstractValidator<CreateAdvertCommand>
{
	public CreateAdvertCommandValidator()
	{
		RuleFor(c => c.Title)
			.NotEmpty()
			.MaximumLength(AdvertConstraints.TitleMaxLength);

		RuleFor(c => c.Description)
			.MaximumLength(AdvertConstraints.DescriptionMaxLength);
	}
}
