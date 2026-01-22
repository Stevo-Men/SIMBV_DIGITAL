
import events from '../data/events.json'

const eventsContainer = document.querySelector('.events-list')

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    const fullDate = date.toLocaleDateString()
    return { month, day, fullDate }
}

const renderEvents = () => {
    if (!eventsContainer) return

    // Sort events by date (newest first or upcoming/past?)
    // Let's assume upcoming first? Or just preserving JSON order.
    // The JSON has generic dates, 2026 and 2025.
    // Let's just map them as is.

    const eventsHtml = events.map(event => {
        const { month, day, fullDate } = formatDate(event.date)
        const soldOutClass = event.soldOut ? 'sold-out' : ''
        const btnText = event.soldOut ? 'Sold Out' : 'Tickets'
        const btnHref = event.soldOut ? '#' : event.ticketLink

        // Filter out empty lineup members
        const lineup = event.lineup_members.filter(m => m).join(', ')

        return `
            <div class="event-card">
                <div class="event-header">
                    <div class="event-date-box">
                        <span class="event-month">${month}</span>
                        <span class="event-day">${day}</span>
                    </div>
                </div>
                
                <div class="event-info">
                    <h2 class="event-title">${event.title}</h2>
                    <div class="event-details">
                        <div style="margin-bottom: 0.5rem;">
                            <span><i class="fas fa-clock"></i> ${event.time}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${event.location || event.address}, ${event.city}</span>
                        </div>
                        ${lineup ? `<div class="event-lineup"><i class="fas fa-users"></i> ${lineup}</div>` : ''}
                    </div>
                </div>

                <div class="event-action">
                    <a href="${btnHref}" class="ticket-btn ${soldOutClass}" ${event.soldOut ? '' : 'target="_blank"'}>
                        ${btnText}
                    </a>
                </div>
            </div>
        `
    }).join('')

    eventsContainer.innerHTML = eventsHtml
}

document.addEventListener('DOMContentLoaded', renderEvents)
// Also run immediately in case DOM is already ready (module script)
renderEvents()
