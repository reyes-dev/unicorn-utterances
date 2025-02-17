import { Element, Root } from "hast";
import { visit } from "unist-util-visit";

export function rehypeFixTwoSlashXHTML() {
	return (tree: Root) => {
		function preVisitor(node: Element) {
			if (node.tagName === "pre") {
				visit(node, "element", (childNode: Element) => {
					if (childNode.tagName === "div") {
						childNode.tagName = "span";
						if (childNode.properties!.style) {
							if ((childNode.properties!.style as string).endsWith(";")) {
								(childNode.properties!.style as string) += "display: block;";
							} else {
								(childNode.properties!.style as string) += "; display: block;";
							}
						} else {
							childNode.properties!.style = "display: block;";
						}
					}
				});
			}
		}
		visit(tree, "element", preVisitor);
		return tree;
	};
}
