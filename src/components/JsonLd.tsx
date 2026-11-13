import React from "react";

/**
 * Serializa datos estructurados Schema.org JSON-LD de forma segura
 * escapando caracteres `<` para prevenir ruptura de etiqueta `</script>`.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
