<template>
  <iframe ref="iframe" :src="pdf_dataurl"/>
</template>

<script>
import jsPDF from "jspdf";

export default {
  name: "A4CollectionPDF",
  props: {
    data: String
  },
  emits: ['invalid-data'],
  computed: {
    pdf_dataurl() {
      let data;

      try {
        data = JSON.parse(this.data)
      } catch (error) {
        this.$emit('invalid-data')
      }

      // Values
      const PAGE_WIDTH = 297
      const PAGE_HEIGHT = 210
      const PAGE_HEADER_HEIGHT = 62
      const PAGE_MARGIN_TOP = 8
      const PAGE_MARGIN_SIDE = 14
      //const PAGE_MARGIN_BOTTOM = 20

      const TITLE_FONT_SIZE = 20
      const SUBTEXT_FONT_SIZE = 14
      const PRICE_FONT_SIZE = 22
      const PRICE_OLD_FONT_SIZE = 16

      const FONT_SIZE_FACTOR = 4
      const TEXT_LINE_GAP = 2
      const PRICE_COLUMN_GAP = 2
      const PROMOTION_LINE_GAP = 6
      const PRICE_OLD_LINE_OFFSET = 1

      const y = (type, index) => {
        // Define base height
        let height = PAGE_HEADER_HEIGHT + PAGE_MARGIN_TOP

        // Loop over the previous this.data
        for (let i = 0; i < index; i++) {
          height += (data[i].title !== '' ? TITLE_FONT_SIZE/FONT_SIZE_FACTOR : 0)
          height += (data[i].title !== '' ? TEXT_LINE_GAP : 0)
          height += (data[i].subtext !== '' ? SUBTEXT_FONT_SIZE/FONT_SIZE_FACTOR : 0)
          height += (data[i].subtext !== '' ? TEXT_LINE_GAP : 0)
          height += PROMOTION_LINE_GAP
        }

        switch (type) {
          case 'SUBTEXT':
            height += (data[index].title !== '' ? TITLE_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
            break;
          case 'PRICE':
            height += (data[index].title !== '' ? TITLE_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
            height += (data[index].subtext !== '' ? SUBTEXT_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
            break;
          case 'PRICE_LOW':
            height += (data[index].title !== '' ? TITLE_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
            height += (data[index].subtext !== '' ? SUBTEXT_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
            break;
          case 'PRICE_LINE_A':
            height += (data[index].title !== '' ? TITLE_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
            height += (data[index].subtext !== '' ? SUBTEXT_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
            height -= 1
            break;
          case 'PRICE_LINE_B':
            height += (data[index].title !== '' ? TITLE_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].title !== '' ? TEXT_LINE_GAP : 0)
            height += (data[index].subtext !== '' ? SUBTEXT_FONT_SIZE/FONT_SIZE_FACTOR : 0)
            height += (data[index].subtext !== '' ? TEXT_LINE_GAP : 0)
            height -= PRICE_OLD_FONT_SIZE/FONT_SIZE_FACTOR
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
        doc.text('Ongeldige Invoer!', PAGE_WIDTH/2, PAGE_HEIGHT/2, { baseline: "middle", align: "center" })
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
        doc.setFontSize(TITLE_FONT_SIZE)
        doc.text(line.title, PAGE_MARGIN_SIDE, y('TITLE',  index), { baseline: 'top' })

        doc.setFont('Helvetica', 'normal')
        doc.setFontSize(SUBTEXT_FONT_SIZE)
        doc.text(line.subtext, PAGE_MARGIN_SIDE, y('SUBTEXT',  index), { baseline: 'top' })

        doc.setFont('Helvetica', 'bold')
        doc.setFontSize(PRICE_FONT_SIZE)
        doc.text(line.price, PAGE_WIDTH/2 - PAGE_MARGIN_SIDE, y('PRICE',  index), { baseline: 'bottom', align: 'right' })
        const price = doc.getTextWidth(line.price)

        if (line.price_old !== '') {
          doc.setFont('Helvetica', 'normal')
          doc.setFontSize(PRICE_OLD_FONT_SIZE)
          doc.text(line.price_old, PAGE_WIDTH / 2 - PAGE_MARGIN_SIDE - price - PRICE_COLUMN_GAP, y('PRICE_LOW', index), {
            baseline: 'bottom',
            align: 'right'
          })
          const old_price = doc.getTextWidth(line.price_old)

          doc.line(PAGE_WIDTH / 2 - PAGE_MARGIN_SIDE - price - PRICE_COLUMN_GAP - old_price - 1, y('PRICE_LINE_A', index), PAGE_WIDTH / 2 - PAGE_MARGIN_SIDE - price - PRICE_COLUMN_GAP, y('PRICE_LINE_B', index))
        }
      })

      return doc.output('datauristring')
    }
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  height: 90vh;
}
</style>