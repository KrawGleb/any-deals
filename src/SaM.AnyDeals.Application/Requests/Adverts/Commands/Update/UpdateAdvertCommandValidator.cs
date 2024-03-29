﻿using FluentValidation;
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

        RuleFor(x => x.Category)
            .MaximumLength(CategoryConstraints.NameMaxLength);

        RuleFor(x => x.Price)
            .Must(p => p is null or >= 0 and <= AdvertConstraints.PriceMaxValue);
        
        RuleFor(x => x.Attachments)
            .Must(a => a is null || a.Count <= AdvertConstraints.AttachmentsMaxCount);
    }
}