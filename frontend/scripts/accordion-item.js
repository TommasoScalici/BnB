function getAccordion(count) {
return `
    <div id="customer-card-${count}" class="card">

        <div class="card-header" id="header-${count}">
        <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${count}" 
                    aria-expanded="true" aria-controls="collapse-${count}">
            Ospite #${count}
            </button>
        </h5>
        </div>

        <div id="collapse-${count}" class="collapse" aria-labelledby="header-${count}" data-parent="#guests-forms">
            <div id="card-body-${count}" class="card-body">

            </div>
        </div>

    </div>
    `;
}

// Non è la roba più bella e felice che io abbia mai scritto, ma sono le 2:08 :)