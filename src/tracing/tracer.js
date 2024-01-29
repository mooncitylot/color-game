import { Resource } from '@opentelemetry/resources'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { pathToRegexp } from 'path-to-regexp'

const collectorUrl = process.env.TELEMETRY_COLLECTOR_URL
const serviceName = process.env.TELEMETRY_SERVICE_NAME
const telemetryApiKey = process.env.TELEMETRY_API_KEY
const telemetryCollectorHeader = process.env.TELEMETRY_COLLECTOR_HEADER
const telemetryTraceHeaderUrls = process.env.TELEMETRY_TRACE_HEADER_URLS
// Convert string urls to regexp for matching
const propagateTraceHeaderCorsUrls = telemetryTraceHeaderUrls.split(',').map((path) => pathToRegexp(path))

const exporter = new OTLPTraceExporter({
  url: collectorUrl,
  // TODO: Use process env to set api keyd
  headers: {
    [telemetryCollectorHeader]: telemetryApiKey,
  },
})
// The main entrypoint for tracing
const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  }),
})

provider.addSpanProcessor(new BatchSpanProcessor(exporter))
provider.register({
  contextManager: new ZoneContextManager(),
})
registerInstrumentations({
  instrumentations: [
    // Adds tracing headers to any requests matching url regex in the list
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls,
    }),
  ],
})
