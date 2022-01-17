import jsPDF from "jspdf";

/* Global Properties */
const FONT_SIZE_FACTOR = 4
const TEXT_LINE_GAP = 2
const PRICE_COLUMN_GAP = 2
const PROMOTION_LINE_GAP = 6
const PRICE_OLD_LINE_OFFSET = 1

/* Promotion Type Specific Properties */
const A5_COLLECTION = {
    TITLE_FONT_SIZE: 20,
    SUBTEXT_FONT_SIZE: 14,
    PRICE_FONT_SIZE: 22,
    PRICE_OLD_FONT_SIZE: 16
}

/* Paper Dimensions */
const A5_DIMENSIONS = {
    PAGE_WIDTH: 297,
    PAGE_HEIGHT: 210,
    PAGE_HEADER_HEIGHT: 62,
    PAGE_MARGIN_TOP: 8,
    PAGE_MARGIN_SIDE: 14,
    PAGE_MARGIN_BOTTOM: 20
}

export function PDFPromotionFunc(type, data) {

    let PROMOTION, DIMENSIONS
    switch (type) {
        case 'A5Collection':
            PROMOTION = A5_COLLECTION
            DIMENSIONS = A5_DIMENSIONS
            break;
        default:
            throw new Error('Invalid Promotion Type: ' + type);
    }

    const y = (index) => {
        // Define base height
        let height = DIMENSIONS.PAGE_HEADER_HEIGHT + DIMENSIONS.PAGE_MARGIN_TOP

        // Loop over the previous this.data
        for (let i = 0; i < index; i++) {
            height += (data[i].title !== '' ? PROMOTION.TITLE_FONT_SIZE / FONT_SIZE_FACTOR : 0)
            height += (data[i].title !== '' ? TEXT_LINE_GAP : 0)
            height += (data[i].subtext !== '' ? PROMOTION.SUBTEXT_FONT_SIZE / FONT_SIZE_FACTOR : 0)
            height += (data[i].subtext !== '' ? TEXT_LINE_GAP : 0)
            height += PROMOTION_LINE_GAP
        }

        switch (type) {
            case 'SUBTEXT':
                height += (data[index].title !== '' ? PROMOTION.TITLE_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
                break;
            case 'PRICE':
                height += (data[index].title !== '' ? PROMOTION.TITLE_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
                height += (data[index].subtext !== '' ? PROMOTION.SUBTEXT_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
                break;
            case 'PRICE_LOW':
                height += (data[index].title !== '' ? PROMOTION.TITLE_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
                height += (data[index].subtext !== '' ? PROMOTION.SUBTEXT_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
                break;
            case 'PRICE_LINE_A':
                height += (data[index].title !== '' ? PROMOTION.TITLE_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
                height += (data[index].subtext !== '' ? PROMOTION.SUBTEXT_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
                height -= 1
                break;
            case 'PRICE_LINE_B':
                height += (data[index].title !== '' ? PROMOTION.TITLE_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
                height += (data[index].subtext !== '' ? PROMOTION.SUBTEXT_FONT_SIZE / FONT_SIZE_FACTOR : 0)
                height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
                height -= PROMOTION.PRICE_OLD_FONT_SIZE / FONT_SIZE_FACTOR
                height -= PRICE_OLD_LINE_OFFSET
                break;
            default:
                break;
        }

        return height
    }

    // PDF Document with options
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    if (data === undefined) {
        doc.setTextColor('red')
        doc.setFontSize(30)
        doc.text('Ongeldige Invoer!', DIMENSIONS.PAGE_WIDTH / 2, DIMENSIONS.PAGE_HEIGHT / 2, {
            baseline: "middle",
            align: "center"
        })
        return doc.output('datauristring')
    }

    // Helpers
    doc.setLineWidth(0.5)
    // doc.line(PAGE_WIDTH/2, 0, PAGE_WIDTH/2, PAGE_HEIGHT) // Middle Line
    // doc.line(0, PAGE_HEADER_HEIGHT, PAGE_WIDTH, PAGE_HEADER_HEIGHT) // Header Line

    console.log(doc.getFontList())

    data.forEach((line, index) => {

        // Text
        doc.setFont('Helvetica', 'bold')
        doc.setFontSize(PROMOTION.TITLE_FONT_SIZE)
        doc.text(line.title, DIMENSIONS.PAGE_MARGIN_SIDE, y('TITLE', index), {baseline: 'top'})

        doc.setFont('Helvetica', 'normal')
        doc.setFontSize(PROMOTION.SUBTEXT_FONT_SIZE)
        doc.text(line.subtext, DIMENSIONS.PAGE_MARGIN_SIDE, y('SUBTEXT', index), {baseline: 'top'})

        doc.setFont('Helvetica', 'bold')
        doc.setFontSize(PROMOTION.PRICE_FONT_SIZE)
        doc.text(line.price, DIMENSIONS.PAGE_WIDTH / 2 - DIMENSIONS.PAGE_MARGIN_SIDE, y('PRICE', index), {baseline: 'bottom', align: 'right'})
        const price = doc.getTextWidth(line.price)

        if (line.price_old !== '') {
            doc.setFont('Helvetica', 'normal')
            doc.setFontSize(PROMOTION.PRICE_OLD_FONT_SIZE)
            doc.text(line.price_old, DIMENSIONS.PAGE_WIDTH / 2 - DIMENSIONS.PAGE_MARGIN_SIDE - price - PRICE_COLUMN_GAP, y('PRICE_LOW', index), {
                baseline: 'bottom',
                align: 'right'
            })
            const old_price = doc.getTextWidth(line.price_old)

            doc.line(DIMENSIONS.PAGE_WIDTH / 2 - DIMENSIONS.PAGE_MARGIN_SIDE - price - PRICE_COLUMN_GAP - old_price - 1, y('PRICE_LINE_A', index), DIMENSIONS.PAGE_WIDTH / 2 - DIMENSIONS.PAGE_MARGIN_SIDE - price - PRICE_COLUMN_GAP, y('PRICE_LINE_B', index))
        }
    })

    return doc.output('datauristring')
}

export class A5CollectionPromotion {

    PROPERTIES = {
        TITLE_FONT_SIZE: 20,
        SUBTEXT_FONT_SIZE: 14,
        PRICE_FONT_SIZE: 22,
        PRICE_OLD_FONT_SIZE: 16
    }

    DIMENSIONS = {
        PAGE_WIDTH: 297,
        PAGE_HEIGHT: 210,
        PAGE_HEADER_HEIGHT: 62,
        PAGE_MARGIN_TOP: 8,
        PAGE_MARGIN_SIDE: 14,
        PAGE_MARGIN_BOTTOM: 20
    }

    constructor() {
        this.lines = []
    }

    addLine(title, subtitle, price, regular_price) {
        this.lines.push({title: title, subtitle: subtitle, price: price, regular_price: regular_price})
    }

    insertLine(index, title, subtitle, price, regular_price) {
        this.lines.splice(index, 0,{title: title, subtitle: subtitle, price: price, regular_price: regular_price})
    }

    // buildPDF() {
    //
    //     // Initialize the PDF document
    //     const document = new jsPDF({
    //         orientation: 'landscape',
    //         unit: 'mm',
    //         format: 'a4'
    //     })
    //
    //     // Calculate X coordinates
    //     const x = (type, index) => {
    //         switch (type) {
    //             case 'TITLE':
    //                 return this.DIMENSIONS.PAGE_MARGIN_SIDE
    //         }
    //     }
    //
    //     // Calculate Y coordinates
    //     const y = (type, index) => {
    //
    //         // Default Header and margins
    //         let height = this.DIMENSIONS.PAGE_HEADER_HEIGHT + this.DIMENSIONS.PAGE_MARGIN_TOP
    //
    //         switch (type) {
    //             case 'TITLE':
    //                 // Loop over the previous lines
    //                 for (let i = 0; i < index; i++) {
    //
    //                 }
    //                 return height
    //         }
    //     }
    //
    //     // Loop over all the lines and write them to the PDF document at the correct coordinates
    //     this.lines.forEach((line, index) => {
    //
    //         // Title
    //         document.setFont('Helvetica', 'bold')
    //         document.setFontSize(this.PROPERTIES.TITLE_FONT_SIZE)
    //         document.text(line.title, x('TITLE', index), y('TITLE', index), { baseline: 'top' })
    //
    //     })
    //
    //     // Return the built PDF object
    //     return document
    // }

    line() {
        const line = new LineBuilder().title('', '').build()
        console.log(line)
    }

}

class LineBuilder {
    constructor() {
        this.titles = []
        this.subtitles = []
        this.price = 0
        this.regular_price = 0
    }

    title(...strings) { this.titles.push(strings) }
    subtitle(...strings) { this.subtitles.push(strings) }
    price(double) { this.price = double }
    regular_price(double) { this.regular_price = double }

    build() {
        return new Line(this.titles, this.subtitles, this.price, this.regular_price)
    }
}

class Line {
    constructor(titles, subtitles, price, regular_price) {
        this.titles = titles
        this.subtitles = subtitles
        this.price = price
        this.regular_price = regular_price
    }
}

/*
* const promo = new A5CollectionPromotion()
* promo.addLine('Hoofdtekst', 'Subtext', 0.99, 1.99)
* promo.addLine('Hoofdtekst 2', 'Subtext 2', 0.59, 5.99)
*
* const pdf_dataurlstring = promo.buildPDF().getDataStringUrl()
* */