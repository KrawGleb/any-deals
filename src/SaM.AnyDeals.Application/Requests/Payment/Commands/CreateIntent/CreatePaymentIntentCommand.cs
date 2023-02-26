namespace SaM.AnyDeals.Application.Requests.Payment.Commands.CreateIntent;

public record CreatePaymentIntentCommand(int AdvertId) : IRequest<Response>;