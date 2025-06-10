import { GenericProcessor } from "./generic-processor"

export class ArrayProcessor extends GenericProcessor {
  constructor(text: string) {
    super("array", /(?<=:\s)\[([^[]*)\]/g, text)
  }

  preprocess() {
    console.log('ArrayProcessor preprocess - Original text:');
    console.log(this.text);

    // Need to preserve dash followed immediately by content
    // Replace standalone dashes that have content on next line
    this.text = this.text.replace(/^(\s*)-\s*\n\s*([^\s-].*$)/gm, (match, p1, p2) => {
      console.log('Found dash with newline:', {
        fullMatch: match,
        indentation: p1,
        content: p2
      });
      return `${p1}- ${p2}`;
    });

    console.log('After first replacement:', this.text);

    // Handle nested cases
    this.text = this.text.replace(/(\n\s+)-\s*\n\s+([^\s-].*$)/gm, (match, p1, p2) => {
      console.log('Found nested dash with newline:', {
        fullMatch: match,
        beforeDash: p1,
        content: p2
      });
      return `${p1}- ${p2}`;
    });

    console.log('After nested replacement:', this.text);
  }

  postprocess() {
    console.log('ArrayProcessor postprocess - Before spacing fix:');
    console.log(this.text);

    // Ensure consistent spacing after dashes
    this.text = this.text.replace(/^(\s*)-\s+/gm, (match, p1) => {
      console.log('Fixing dash spacing:', {
        fullMatch: match,
        indentation: p1
      });
      return `${p1}- `;
    });

    console.log('Final text after processing:');
    console.log(this.text);
  }
}