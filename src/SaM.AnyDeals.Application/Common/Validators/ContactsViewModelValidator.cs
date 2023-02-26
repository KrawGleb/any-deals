using FluentValidation;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Constraints;

namespace SaM.AnyDeals.Application.Common.Validators;

public class ContactsViewModelValidator : AbstractValidator<ContactsViewModel>
{
    public ContactsViewModelValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(ContactsConstraints.NameMaxLength);

        RuleFor(x => x.Email)
            .EmailAddress()
            .MaximumLength(ContactsConstraints.EmailMaxLength);

        RuleFor(x => x.Phone)
            .MaximumLength(ContactsConstraints.PhoneMaxLength);

        RuleFor(x => x.Address)
            .MaximumLength(ContactsConstraints.AddressMaxLength);

        RuleFor(x => x.Facebook)
            .MaximumLength(ContactsConstraints.FacebookMaxLength);

        RuleFor(x => x.VK)
            .MaximumLength(ContactsConstraints.VkMaxLength);

        RuleFor(x => x.Instagram)
            .MaximumLength(ContactsConstraints.InstagramMaxLength);

        RuleFor(x => x.LinkedIn)
            .MaximumLength(ContactsConstraints.LinkedInMaxLength);

        RuleFor(x => x.Telegram)
            .MaximumLength(ContactsConstraints.TelegramMaxLength);

        RuleFor(x => x.WhatsApp)
            .MaximumLength(ContactsConstraints.WhatsAppMaxLength);
    }
}