#ifndef PXT_PAGED_DATA_LOG_H
#define PXY_PAGED_DATA_LOG_H

namespace DataLoggerPages {
    int nativeFlashLength();
    int readLogLine( char * buffer, int length, bool reset = false );
    long getFlashTally( int page, int section, int index, char * column );
}

#endif
