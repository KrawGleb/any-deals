using FluentValidation;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Constraints;

namespace SaM.AnyDeals.Application.Common.Validators;

public class AttachmentViewModelValidator : AbstractValidator<AttachmentViewModel>
{
	public AttachmentViewModelValidator()
	{
		RuleFor(x => x.Name)
			.NotEmpty()
			.MaximumLength(AttachmentConstraints.NameMaxLength);

		RuleFor(x => x.Link)
			.NotEmpty()
			.MaximumLength(AttachmentConstraints.LinkMaxLength);
	}
}
