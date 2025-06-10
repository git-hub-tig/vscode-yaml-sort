import { GenericProcessor } from "./generic-processor"
import { Logger } from "./logger"

export class ArrayProcessor extends GenericProcessor {
  private indent: number;

  constructor(text: string, indent: number = 2) {
    super("array", /(?<=:\s)\[([^[]*)\]/g, text)
    this.indent = indent;
  }

  preprocess() {
  }

  postprocess() {
    // Ensure consistent spacing after dashes using configured indent size
    this.text = this.text.replace(/^(\s*)-\s+/gm, (match, p1) => {
      Logger.log('Fixing dash spacing:', {
        fullMatch: match,
        indentation: p1,
        indentSize: this.indent
      });
      return `${p1}-${' '.repeat(this.indent-1)}`;
    });
  }
}