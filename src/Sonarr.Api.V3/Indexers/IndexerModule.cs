﻿using NzbDrone.Core.Indexers;

namespace Sonarr.Api.V3.Indexers
{
    public class IndexerModule : ProviderModuleBase<IndexerResource, IIndexer, IndexerDefinition>
    {
        public IndexerModule(IndexerFactory indexerFactory)
            : base(indexerFactory, "indexer")
        {
        }

        protected override void Validate(IndexerDefinition definition, bool includeWarnings)
        {
            if (!definition.Enable) return;
            base.Validate(definition, includeWarnings);
        }
    }
}