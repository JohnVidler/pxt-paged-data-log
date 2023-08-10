#ifndef PXT_PAGED_DATA_LOG_H
#define PXY_PAGED_DATA_LOG_H

namespace DataLoggerPages {
    int nativeFlashLength();
    
    int readLogLine( ManagedString buffer, int start )

    long getFlashTally( int page, int section, int index, ManagedString column );
}

#endif
